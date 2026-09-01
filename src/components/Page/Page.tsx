import {type ReactNode} from "react";

type PageProps = {
    children: ReactNode
}

type PageHeaderProps = {
    title: string
}
export const Page = ({children}: PageProps) => {
    return (
        <div className={'flex flex-col gap-6 p-2'}>
            {children}
        </div>
    );
};

export const PageHeader = ({title}:PageHeaderProps) => {
    return (
        <div className={'font-bold text-2xl'}>
            {title}
        </div>
    );
};


