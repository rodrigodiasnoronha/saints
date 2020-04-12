import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

interface Props {
    name: string;
    label?: string;
    ref?: any;
}

type InputProps = JSX.IntrinsicElements['textarea'] & Props;

const TextAreaInput: React.FC<InputProps> = ({ name, label, ...rest }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const { fieldName, defaultValue, registerField, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            path: 'value',
            ref: inputRef.current
        });
    }, [fieldName, registerField]);

    return (
        <>
            {label && <label htmlFor={fieldName}>{label}</label>}
            <textarea
                id={fieldName}
                ref={inputRef}
                defaultValue={defaultValue}
                {...rest}
            >
                {defaultValue}
            </textarea>
            {error && <span>{error}</span>}
        </>
    );
};
export default TextAreaInput;
