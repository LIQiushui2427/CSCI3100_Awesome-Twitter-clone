import EditableImage from "./EditableImage";

// The Avatar component displays a circular image, with the option to make it editable
/**
 * @param src - The URL of the image to display as the avatar
 * @param onChange - A function to call when the user updates the avatar image
 * @param editable - A flag indicating whether the user can edit the avatar image
 */
export default function Avatar({ src, onChange, editable }) {
  // Render an EditableImage component, with props to specify that it's an 'image' type, 
  // and to pass in the src, onChange, editable, and CSS classes for styling
  return (
    <EditableImage
      type={'image'}
      src={src}
      onChange={onChange}
      editable={editable}
      className={'rounded-full overflow-hidden w-36 h-36'}
    />
  );
}
