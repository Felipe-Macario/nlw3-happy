import React from 'react';

import '../styles/components/checkbox.css';

interface Props {
    label: string;
    checked: boolean;
    onChange: () => void;
}

export default function Checkbox(props: Props){
    return (
        <label className="container"> { props.label }
            <input type="checkbox" {...props} />
            <span className="checkmark" />
        </label>
    );
}