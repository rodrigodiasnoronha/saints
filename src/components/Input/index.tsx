import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import Input from './styles';

interface Props {
    name: string;
    label?: string;
    ref?: any;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

const InputComponent: React.FC<InputProps> = ({ name, label, ...rest }) => {
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
            <Input
                id={fieldName}
                ref={inputRef}
                defaultValue={defaultValue}
                {...rest}
            />
            {error && <span>{error}</span>}
        </>
    );
};
export default InputComponent;
