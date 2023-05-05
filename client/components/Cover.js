import EditableImage from "./EditableImage";

// Component for displaying a cover image
/**
* @param src: the URL of the image
* @param onChange: function to call when the image is edited
* @param editable: whether the image is editable or not
*/
export default function Cover({src, onChange, editable}) {
  // Render the EditableImage component with the 'cover' type
  // and the given props
  return (
    <EditableImage
      type={'cover'}
      src={src}
      onChange={onChange}
      editable={editable}
      className={'h-48'} // set the height of the image
    />
  );
}

