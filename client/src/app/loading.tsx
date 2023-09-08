interface Props {
    className: string;
}

export default function Loading<Props>({ ...props }) {
    return <p {...props}>Loading...</p>;
}
