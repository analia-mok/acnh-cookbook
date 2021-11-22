import { h } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import Fuse from 'fuse.js';
import RecipePreview from './RecipePreview';
import { debounce } from 'lodash';

export default function RecipeSearch({ recipes }) {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('all');
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
  });

  const [items, setItems] = useState(recipes);
  const searchOptions = {
    includeScore: true,
    keys: ['title', 'type', 'source'],
    threshold: 0.45,
    distance: 100,
  };
  const fuse = new Fuse(recipes, searchOptions);

  const debouncedSearch = useCallback(
    debounce((filters) => handleSearch(filters), 500),
    []
  );

  const handleSearch = (filters) => {
    const selectedType = filters.type;
    const term = filters.search;

    let results = recipes;

    if (term.length) {
      results = fuse.search(term);
      console.log(results);
      results = results.map((result) => result.item);
    }

    if (selectedType !== 'all') {
      results = results.filter((recipe) => recipe.type === selectedType);
    }

    setItems(results);
  };

  const handleTermChange = (e) => {
    setFilters((filters) => {
      const updatedFilters = {
        ...filters,
        search: e.target.value,
      };

      // handleSearch(updatedFilters);
      debouncedSearch(updatedFilters);

      return updatedFilters;
    });
  };

  const handleTypeChange = (e) => {
    setFilters((filters) => {
      const updatedFilters = {
        ...filters,
        type: e.target.value,
      };

      handleSearch(updatedFilters);

      return updatedFilters;
    });
  };

  return (
    <>
      <section class='container mx-auto max-w-3xl pb-12'>
        <form action='#' class='flex justify-between flex-wrap sm:flex-nowrap mx-8'>
          <label htmlFor='search' className='sr-only'>
            Search by recipe name
          </label>
          <input
            type='text'
            name='search'
            id='search'
            value={filters.search}
            onInput={handleTermChange}
            class='
              w-full
              sm:w-auto
              flex-grow
              mb-4
              sm:mb-0
              sm:mr-8
              rounded-md
              border-orange-800
              border-2
              focus:border-orange-600 focus:ring-0'
          />
          <label htmlFor='filter' className='sr-only'>
            Filter recipes by type
          </label>
          <select
            name='filters'
            id='filters'
            value={filters.type}
            onChange={handleTypeChange}
            class='w-full md:w-auto rounded-md border-orange-800 border-2 focus:border-orange-600 pl-6 focus:bg-white focus:ring-0'
          >
            <option value='all' defaultChecked={true}>
              Type: All
            </option>
            <option value='savory'>Savory</option>
            <option value='sweet'>Sweet</option>
            <option value='misc'>Misc</option>
          </select>
        </form>
      </section>
      <section class='container mx-auto' aria-label='Recipes list'>
        <div class='flex flex-wrap flex-shrink'>
          {items.map((r) => (
            <div class='recipe-wrapper w-full md:w-1/3 xl:w-1/4 mx-8 md:mx-4 mb-8'>
              <RecipePreview recipe={r} />
            </div>
          ))}
          {items.length === 0 && (
            <p className='max-w-2xl text-yellow-900 text-center mx-auto'>
              Whoops! Looks like there aren't any recipes meeting your search criteria. Please try
              again with a different keyword or filter
            </p>
          )}
        </div>
      </section>
    </>
  );
}
