import React from 'react'


interface ButtonProps{
    className? : string
    title?:string
    onClick?:()=>void
}
const Button:React.FC<ButtonProps> = ({className,title,onClick}) => {
    return (
        <div>
            <button onClick={onClick} className={className}>
                {title}
            </button>
        </div>
    )
}

export default Button
