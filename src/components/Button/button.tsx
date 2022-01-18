import React from 'react'


interface ButtonProps{
    className? : string
    title?:string
    onClick?:()=>void
    icon?: any
    disable?:boolean
    
}
const Button:React.FC<ButtonProps> = ({className,title,onClick,icon,disable}) => {
    return (
        <div>
            <button onClick={onClick} className={className} disabled={disable}>
                {icon}
                {title}
            </button>
        </div>
    )
}

export default Button
