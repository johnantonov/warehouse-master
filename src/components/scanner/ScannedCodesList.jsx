import { BaseBtn } from "../buttons/BaseBtn/BaseBtn";

const ScannedCodesList = ({ scannedCodes, classname, onDelete }) => {
  let headerIcon = scannedCodes[0] ? '✅' : '❎'; 

  return (
    <div className={classname}> 
      <h5 className="mar-b-16 flow-text">{headerIcon} Отсканировано: {scannedCodes.length}</h5> {/* исправлено */}
      <ul className="">
        {scannedCodes.map((code, index) => (
          <li className="mar-b-4 df ai-cntr" key={index}>
            <BaseBtn classname={'mar-r-12 lime lighten-5'} handler={() => onDelete(index)}>❌</BaseBtn>
            <span className="flow-text">{code}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScannedCodesList;