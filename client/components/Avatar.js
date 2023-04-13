import EditableImage from "./EditableImage";

export default function Avatar({ src, onChange, editable}) {
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