
interface ErrorMessageProps{
    message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
    return <p style={{color: 'red'}}> Error: {message} </p>;
}