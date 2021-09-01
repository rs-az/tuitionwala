import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Pager = ({ key, innerClass, handleClick, text, icon, currentPage }) => {
  //   const handleClick = () => {};
  return (
    <li key={key} class={innerClass} onClick={() => handleClick(currentPage)}>
      <span>
        {icon &&
          (icon == 'left' ? (
            <FontAwesomeIcon icon={faAngleLeft} />
          ) : (
            <FontAwesomeIcon icon={faAngleRight} />
          ))}
        {text}
      </span>
    </li>
  );
};

export default Pager;
