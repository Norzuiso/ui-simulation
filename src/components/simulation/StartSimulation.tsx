import { useState } from 'react'
import type { StartSimulationRequest } from '../../types/startSimulation';


export function StartSimulation() {

    const [inputs, setInputs] = useState<StartSimulationRequest>({ init_epoch: 0, end_epoch: 0, seed: 0, steps_mode: false })

    const handleChange = (e: { target: any; }) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setInputs((values: any) => ({ ...values, [name]: value }))
    }

    //    const [clientsInfo, setClientsInfo] = useState<ClientInfo[]>([]);
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        console.log(inputs);
        event.preventDefault();
    }

    return (
        <>
            <form method="post" onSubmit={handleSubmit}>
                <label>
                    Init epoch: <input name="init_epoch" type='number' value={inputs?.init_epoch} onChange={handleChange} />
                </label>
                <label>
                    End epoch: <input name="end_epoch" type='number' value={inputs?.end_epoch} onChange={handleChange} required={true} min={Number(inputs.init_epoch) + 1} />
                </label>
                <label>
                    General seed: <input name="seed" type='number' value={inputs?.seed} onChange={handleChange} required={true} />
                </label>
                <label>
                    Step mode: <input name="steps_mode" type='checkbox' checked={inputs?.steps_mode} onChange={handleChange} />
                </label>
                <button type="reset">Reset form</button>
                <button type="submit">Submit form</button>
            </form>
        </>
    )
}