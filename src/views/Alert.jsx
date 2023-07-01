import React from 'react'
import PropTypes from 'prop-types'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
function Alert({msg}) {
  return (
    confirmAlert({
      closeOnEscape: false,
      closeOnClickOutside: false,
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui' dir="rtl">
            <h3><FontAwesomeIcon icon={faTriangleExclamation} />توجه</h3>
            <p>آیا از حذف اطمینان دارید ؟</p>
            <button className='btn btn-sm btn-secondary mr-2' onClick={onClose}>خیر</button>
            <button className='btn btn-sm btn-danger'
              onClick={() => {
                const headers = {
                  Authorization: `Bearer ${localStorage.getItem("access-tocken")}`
                };

                axios.delete(serverAdress + `DeleteSouratHazineHeader?id=${id}`, { headers })
                  .then(function (res) {
                    toast.success('عملیات با موفقیت انجام پذیرفت', {
                      position: toast.POSITION.TOP_LEFT,
                      className: 'toast-message'
                    });

                    setTimeout(() => {
                      setIsAction(false);
                      history.push("/expencelist");
                    }, 1000);

                  })
                  .catch(function (error) {
                    setIsAction(false);
                    console.log("axois error: " + error);
                    toast.error('خطا در انجام عملیات', {
                      position: toast.POSITION.TOP_LEFT
                    });
                  });
                onClose();
              }}
            >
              بلی
            </button>
          </div>
        )
      }
    })
  )
}

Alert.propTypes = {}

export default Alert
