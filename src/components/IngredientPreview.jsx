import { h } from 'preact';
import { getIngredient } from '../utils/ingredientMap';

export default function IngredientPreview({ ingredient }) {
  let itemUrl = '';
  let name = ingredient.name || '';

  if (ingredient.type === 'fish') {
    itemUrl = `https://acnhapi.com/v1/icons/fish/${ingredient.id}`;
  } else {
    const item = getIngredient(ingredient.id, ingredient.type);

    if (item) {
      if (ingredient.type === 'recipe') {
        itemUrl = `https://acnhcdn.com/2.0/CookingIcon/${item.image}`;
      } else {
        itemUrl = `https://acnhcdn.com/latest/MenuIcon/${item.image}`;
      }

      name = item.title || '';
    } else {
      return '';
    }
  }

  return (
    <div>
      <img
        src={itemUrl}
        alt={`In game thumbnail of ${name}`}
        class='inline-block w-11 h-auto mb-2'
        loading='lazy'
      />
      {ingredient.type === 'fish' && (
        <a href={`/fish/${ingredient.id}`} class='hover:underline'>
          <span class='text-orange-900 font-medium mx-4'>{name}</span>
        </a>
      )}
      {ingredient.type !== 'fish' && (
        <span class='text-orange-900 font-medium ml-4 mr-2' aria-hidden='true'>
          {name}
        </span>
      )}
      <span
        class='bg-green-100 text-green-900 inline-block px-2 py-1 rounded-md font-medium'
        aria-hidden='true'
      >
        x {ingredient.quantity}
      </span>
    </div>
  );
}
