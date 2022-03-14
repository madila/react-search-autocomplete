import { default as Fuse } from 'fuse.js'
import React, { ChangeEvent, FocusEventHandler, useEffect, useRef, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { defaultFuseOptions, DefaultTheme, defaultTheme } from '../config/config'
import { debounce } from '../utils/utils'
import Results from './Results'
import SearchInput from './SearchInput'

export const DEFAULT_INPUT_DEBOUNCE = 200
export const MAX_RESULTS = 10

export interface ReactSearchAutocompleteProps<T> {
  items: T[]
  fuseOptions?: Fuse.IFuseOptions<T>
  inputDebounce?: number
  onSearch?: (keyword: string, results: T[]) => void
  onHover?: (result: T) => void
  onSelect?: (result: T) => void
  onFocus?: FocusEventHandler<HTMLInputElement>
  onClear?: Function
  showIcon?: boolean
  showClear?: boolean
  maxResults?: number
  placeholder?: string
  autoFocus?: boolean
  styling?: DefaultTheme
  resultStringKeyName?: string
  inputSearchString?: string
  formatResult?: Function
}

export default function ReactSearchAutocomplete<T>({
  items = [],
  fuseOptions = defaultFuseOptions,
  inputDebounce = DEFAULT_INPUT_DEBOUNCE,
  onSearch = () => {},
  onHover = () => {},
  onSelect = () => {},
  onClear = () => {},
  showIcon = true,
  showClear = true,
  maxResults = MAX_RESULTS,
  placeholder = '',
  autoFocus = false,
  styling = {},
  resultStringKeyName = 'name',
  inputSearchString = ''
}: ReactSearchAutocompleteProps<T>) {

  const theme = { ...defaultTheme, ...styling }
  const options = { ...defaultFuseOptions, ...fuseOptions }

  const fuse = new Fuse(items, options)
  fuse.setCollection(items)

  const [searchString, setSearchString] = useState(inputSearchString)
  const [results, setResults] = useState<any[]>([])
  const [isFocused, setIsFocused] = useState<boolean>(false)

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const callOnSearch = (keyword: string) => {
    let newResults: T[]

    newResults = keyword?.length > 0 ? fuseResults(keyword) : items;

    setResults(newResults)
    onSearch(keyword, newResults)
  }

  const handleOnSearch = React.useCallback(
    inputDebounce > 0
      ? debounce((keyword: string) => callOnSearch(keyword), inputDebounce)
      : (keyword) => callOnSearch(keyword),
    [items]
  )

  const handleClickOutside = (event:any) => {
    console.log(event, wrapperRef.current);
    if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
    ) {
      setIsFocused(false)
    }
  }

  useEffect(() => {
    document
        .addEventListener('keydown', handleClickOutside);
    document
        .addEventListener('mousedown', handleClickOutside);
    return function cleanup() {
      document
          .removeEventListener('keydown', handleClickOutside);
      document
          .removeEventListener('mousedown', handleClickOutside);
    };
  }, [])

  useEffect(() => {
    setSearchString(inputSearchString)
  }, [inputSearchString])

  useEffect(() => {
    searchString?.length > 0 &&
      results &&
      results?.length > 0 &&
      setResults(fuseResults(searchString))
  }, [items])

  const handleOnClick = (result: T) => {
    setResults(items)
    onSelect(result)
    setIsFocused(true)
  }

  const handleOnBlur = () => {
    setResults(results.length > 0 ? results : items);
  }

  const handleOnFocus = () => {
    console.log('focused');
    setResults(results.length > 0 ? results : items);
    setIsFocused(true);
  }

  const formatResult = (item: any) => {
    return <button tabIndex={0} type={'button'} aria-label={'Select '+item.name} className='select-result'>{item.name}</button>;
  }

  const fuseResults = (keyword: string) =>
    fuse
      .search(keyword, { limit: maxResults })
      .map((result) => ({ ...result.item }))
      .slice(0, maxResults)

  const handleSetSearchString = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const keyword = target.value
    setSearchString(keyword)
    handleOnSearch(keyword)
  }

  return (
    <ThemeProvider theme={theme}>
      <StyledReactSearchAutocomplete>
        <div className="wrapper" ref={wrapperRef}>
          <SearchInput
            searchString={searchString}
            setSearchString={handleSetSearchString}
            autoFocus={autoFocus}
            onBlur={handleOnBlur}
            onFocus={handleOnFocus}
            onClear={onClear}
            placeholder={placeholder}
            showIcon={showIcon}
            showClear={showClear}
          />
          <Results
            results={results}
            onClick={handleOnClick}
            onHover={onHover}
            isFocused={isFocused}
            setSearchString={setSearchString}
            showIcon={showIcon}
            maxResults={maxResults}
            resultStringKeyName={resultStringKeyName}
            setIsFocused={setIsFocused}
            formatResult={formatResult}
          />
        </div>
      </StyledReactSearchAutocomplete>
    </ThemeProvider>
  )
}

const StyledReactSearchAutocomplete = styled.div`
  position: relative;

  height: ${(props) => parseInt(props.theme.height) + 2 + 'px'};

  > .wrapper {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100%;

    border: ${(props) => props.theme.border};
    border-radius: ${(props) => props.theme.borderRadius};

    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.color};

    font-size: ${(props) => props.theme.fontSize};
    font-family: ${(props) => props.theme.fontFamily};

    z-index: ${(props) => props.theme.zIndex};

    &:hover {
      box-shadow: ${(props) => props.theme.boxShadow};
    }
    &:active {
      box-shadow: ${(props) => props.theme.boxShadow};
    }
    &:focus-within {
      box-shadow: ${(props) => props.theme.boxShadow};
    }
  }
`
