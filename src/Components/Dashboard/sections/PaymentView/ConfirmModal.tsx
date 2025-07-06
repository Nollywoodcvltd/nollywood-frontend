import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { initializePayment } from './functions/initializePayment';
import { useNavigate } from 'react-router-dom';
import { clearAutoLogout } from '../../../../utils/tokenManager';

interface ConfirmModalProps {
  plan: string;
  onHide: () => void;
  show: boolean;
  amount: number;
  email: string;
}

const ConfirmModal = (props: ConfirmModalProps) => {
  const navigate = useNavigate();

  const logout = () => {
    clearAutoLogout();
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Payment Confirmation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          You're about to pay ₦{`${props.amount}`} for the {`${props.plan}`}{' '}
          plan you selected. Are you sure you want to proceed?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          style={{
            borderColor: '#ffb332',
            borderWidth: 1,
            color: '#ffb332',
            backgroundColor: 'white',
          }}
          onClick={props.onHide}
        >
          Cancel
        </Button>
        <Button
          style={{ backgroundColor: '#ffb332', border: 'none' }}
          onClick={() => {
            initializePayment(props.email, props.amount, logout);
          }}
        >
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
