import { useState } from 'react'


export function StartSimulation() {

    const [initEpoch, setInitEpoch] = useState<string>();
    const [endEpoch, setEndEpoch] = useState<string>();
    const [seed, setSeed] = useState<string>();
    const [stepsMode, setStepsMode] = useState<string>();

    //    const [clientsInfo, setClientsInfo] = useState<ClientInfo[]>([]);
    function handleSubmit(e: { preventDefault: () => void; target: any; }) {
        // Prevent the browser from reloading the page
        e.preventDefault();

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);

        // You can pass formData as a fetch body directly:
        //fetch('/some-api', { method: form.method, body: formData });

        // Or you can work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
    }

    return (
        <>
            <form method="post" onSubmit={handleSubmit}>
                <label>
                    Text input: <input name="initEpoch" defaultValue="0" type='number' />
                </label>
                <label>
                    Text input: <input name="endEpoch" defaultValue="0" type='number' />
                </label>
                <label>
                    Text input: <input name="seed" defaultValue="0" type='number' />
                </label>
                <label>
                    Text input: <input name="stepsMode" defaultValue="0" type='checkbox' />
                </label>
                <button type="reset">Reset form</button>
                <button type="submit">Submit form</button>
            </form>
        </>
    )
}