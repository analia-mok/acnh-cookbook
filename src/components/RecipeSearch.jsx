import { h } from 'preact';
import { useState } from 'preact/hooks';
import RecipePreview from './RecipePreview';

export default function RecipeSearch({ recipes }) {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('all');
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
  });

  const [items, setItems] = useState(recipes);

  const handleSearch = (filters) => {
    const selectedType = filters.type;
    const term = filters.search;

    let results = recipes;

    if (selectedType !== 'all') {
      results = results.filter((recipe) => recipe.type === selectedType);
    }

    if (term.length) {
      results = results.filter((i) => i.title.toLowerCase().includes(term.toLowerCase()));
    }

    setItems(results);
  };

  const handleTermChange = (e) => {
    setFilters((filters) => {
      const updatedFilters = {
        ...filters,
        search: e.target.value,
      };

      handleSearch(updatedFilters);

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
              All
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
        </div>
      </section>
    </>
  );
}
