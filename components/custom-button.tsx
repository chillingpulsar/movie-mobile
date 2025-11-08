import { cn } from '@/lib/utils';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface CustomButtonProps extends TouchableOpacityProps {
    loader?: boolean;
    title: string;
    className?: string;
    textClassName?: string;
}

const CustomButton = ({ loader, title, className, textClassName, ...props }: CustomButtonProps) => {
    return (
        <TouchableOpacity
            disabled={loader}
            {...props}
            className={cn(
                'bg-primary h-20 flex items-center justify-center px-4 rounded-lg',
                loader ? 'opacity-50' : 'opacity-100',
                className
            )}
        >
            {loader ? (
                <ActivityIndicator size="large" color="#fff" />
            ) : (
                <Text className={cn('text-white text-center', textClassName)}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

export default CustomButton;
