import { cn } from '@/lib/utils';
import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

interface TextFieldProps extends TextInputProps {
    label: string;
    className?: string;
}

const TextField = ({
    label,
    className,

    ...props
}: TextFieldProps) => {
    return (
        <TextInput
            {...props}
            placeholderTextColor="#A8B5DB"
            className={cn(
                'border border-gray-300 text-white rounded-lg text-2xl w-full h-20 px-4',
                className
            )}
        />
    );
};

export default TextField;
