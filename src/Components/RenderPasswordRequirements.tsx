import CheckIcon from '@mui/icons-material/Check';
import { PasswordRequirementsProps } from '../types';

const RenderPasswordRequirements: React.FC<PasswordRequirementsProps> = ({
  password,
  requirement,
}) => {
  const hasSpecialChar = /[!-/:-@[-`{-~]/;
  const hasNumber = /\d/;
  const hasUpper = /\p{Lu}/u;
  return (
    <div className='password-requirements'>
      <CheckIcon
        className={`check-icon ${
          requirement === '8 Characters minimum' && password.length >= 8
            ? 'length-check'
            : requirement === '1 Special Character' &&
              hasSpecialChar.test(password)
            ? 'char-check'
            : requirement === '1 Number' && hasNumber.test(password)
            ? 'num-check'
            : requirement === '1 Uppercase' && hasUpper.test(password)
            ? 'upper-check'
            : ''
        }`}
        style={{ fontSize: 20, marginRight: 8 }}
      />
      <p>{requirement}</p>
    </div>
  );
};

export default RenderPasswordRequirements;
