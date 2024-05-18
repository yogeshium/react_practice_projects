function Button({colorName,setColor})
{
    const classValue=`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-60`;
    return(
        <button
        className={classValue}
        style={{background: colorName}}
        onClick={()=>{setColor(colorName)}}
    >{colorName}
    </button>
    );
}

export default Button;