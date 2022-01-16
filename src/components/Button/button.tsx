import React from 'react'


interface ButtonProps{
    className? : string
    title?:string
    onClick?:()=>void
    icon?: string
    
}
const Button:React.FC<ButtonProps> = ({className,title,onClick,icon}) => {
    return (
        <div>
            <button onClick={onClick} className={className}>
                {icon}
                {title}
            </button>
        </div>
    )
}

export default Button
