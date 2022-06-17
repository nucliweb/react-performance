import Head from 'next/head'
import Link from 'next/link'

import {useState, useMemo, memo} from 'react'
import Footer from '../../components/Footer'

import styles from '../../styles/Home.module.css'

import {useCombobox} from '../../hooks/useComboBox'
import useForceRerender from '../../hooks/useForceRerender'
import {getItems} from '../../scripts/filter-municipalities'

function Menu({
  items,
  getMenuProps,
  getItemProps,
  highlightedIndex,
  selectedItem,
}) {
  return (
    <ul className={styles.list} {...getMenuProps()}>
      {items.map((item, index) => (
        <ListItem
          key={item.id}
          getItemProps={getItemProps}
          item={item}
          index={index}
          selectedItem={selectedItem}
          highlightedIndex={highlightedIndex}
        >
          {item.name}
        </ListItem>
      ))}
    </ul>
  )
}

Menu = memo(Menu)

function ListItem({
  getItemProps,
  item,
  index,
  selectedItem,
  highlightedIndex,
  ...props
}) {
  const isSelected = selectedItem?.id === item.id
  const isHighlighted = highlightedIndex === index
  return (
    <li
      {...getItemProps({
        index,
        item,
        style: {
          fontWeight: isSelected ? 'bold' : 'normal',
          backgroundColor: isHighlighted ? 'lightgray' : 'inherit',
        },
        ...props,
      })}
    />
  )
}

// eslint-disable-next-line react/display-name
ListItem = memo(ListItem, (prevProps, nextProps) => {
  // true means do NOT rerender
  // false means DO rerender

  // these ones are easy if any of these changed, we should re-render
  if (prevProps.getItemProps !== nextProps.getItemProps) return false
  if (prevProps.item !== nextProps.item) return false
  if (prevProps.index !== nextProps.index) return false
  if (prevProps.selectedItem !== nextProps.selectedItem) return false

  // this is trickier. We should only re-render if this list item:
  // 1. was highlighted before and now it's not
  // 2. was not highlighted before and now it is
  if (prevProps.highlightedIndex !== nextProps.highlightedIndex) {
    const wasPrevHighlighted = prevProps.highlightedIndex === prevProps.index
    const isNowHighlighted = nextProps.highlightedIndex === nextProps.index
    return wasPrevHighlighted === isNowHighlighted
  }
  return true
})


export default function UseMemo() {
  const forceRerender = useForceRerender()
  const [inputValue, setInputValue] = useState('')

  const allItems = useMemo(() => getItems(inputValue), [inputValue])
  const items = allItems.slice(0, 100)

  const {
    selectedItem,
    highlightedIndex,
    getComboboxProps,
    getInputProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
    selectItem,
  } = useCombobox({
    items,
    inputValue,
    onInputValueChange: ({inputValue: newValue}) => setInputValue(newValue),
    onSelectedItemChange: ({selectedItem}) =>
      alert(
        selectedItem
          ? `You selected ${selectedItem.name}`
          : 'Selection Cleared',
      ),
    itemToString: item => (item ? item.name : ''),
  })


  return (
    <div className={styles.container}>
      <Head>
        <title>Optimize Expensive Calculations</title>
        <meta name="description" content="Optimize Expensive Calculations" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Optimize Expensive Calculations
        </h1>
        <div className={styles.grid}>
          
        <Link href="/">
            <a className={styles.menu}>
              &larr; Back to home
            </a>
          </Link>
          <Link href="/expensive-calc/final">
            <a className={styles.menu}>
              Final &rarr;
            </a>
          </Link>
          <Link href="/expensive-calc#">
            <a 
              className={styles.menu}
              onClick={() => alert('👋🏼 Test it in production mode version 🚀')}
            >
              Production mode &rarr;
            </a>
          </Link>
          <Link href="/expensive-calc/memo">
            <a className={styles.menu}>
              React.memo &rarr;
            </a>
          </Link>
          <Link href="/expensive-calc/memo-custom">
            <a className={styles.menu}>
              React.memo (custom) &rarr;
            </a>
          </Link>
          <Link href="/expensive-calc/memo-primitive">
            <a className={styles.menu}>
              React.memo (primitive) &rarr;
            </a>
          </Link>
          <Link href="/expensive-calc/worker">
            <a className={styles.menu}>
              Web Worker &rarr;
            </a>
          </Link>
        </div>

        <div className={styles.mainContent}>

        <button onClick={forceRerender}>force rerender</button>
        <div>
          <label {...getLabelProps()}>Find a city</label>
          <div {...getComboboxProps()}>
            <input {...getInputProps({type: 'text'})} />
            <button onClick={() => selectItem(null)} aria-label="toggle menu">
              &#10005;
            </button>
          </div>
          <Menu
            items={items}
            getMenuProps={getMenuProps}
            getItemProps={getItemProps}
            highlightedIndex={highlightedIndex}
            selectedItem={selectedItem}
          />
        </div>
          
        </div>

      </main>
      <Footer/>
    </div>
  )
}
