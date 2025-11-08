import { cn } from '@/lib/utils';
import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface CustomButtonProps extends TouchableOpacityProps {
    title: string;
    className?: string;
    textClassName?: string;
}

const CustomButton = ({ title, className, textClassName, ...props }: CustomButtonProps) => {
    return (
        <TouchableOpacity
            {...props}
            className={cn(
                'bg-primary h-20 flex items-center justify-center px-4 rounded-lg',
                className
            )}
        >
            <Text className={cn('text-white text-center', textClassName)}>{title}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;
