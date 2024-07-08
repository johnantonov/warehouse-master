export const BaseBtn = ({ handler, children, classname }) => {
  return (
    <button className={`waves-effect waves-light ${classname} btn`} onClick={handler}>
      {children}
    </button>
  )
}