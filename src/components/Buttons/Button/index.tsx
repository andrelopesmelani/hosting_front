import './styles.scss';
import { ThreeDots } from "react-loader-spinner";

interface IButton {
    title: string;
    disabled?: boolean;
    loading?: boolean;
    danger?: boolean
    onClick: () => void
}

const Button = ({title, loading, disabled, danger,onClick}: IButton) => {

    return(
        <button style={{backgroundColor: danger && '#ff445d', borderColor: danger && '#ff445d'}} className='button' onClick={onClick} disabled={disabled}>
            {loading ? <ThreeDots width='24' color='white' />  : title}
        </button>
    )
}

export default Button