import React from 'react';
import PropTypes from 'prop-types';
import BackArrowIcon from '../UI/SvgIcons/BackArrow';
import Input from '../UI/Inputs/Input/Input';
import CircularSpinner from '../UI/SvgSpinners/Circular';
import EscIcon from '../UI/SvgIcons/Esc';
import styles from './SearchTab.module.scss';

export default function SearchTab(props) {
  const {
    inputRef,
    isSearching,
    toggleSearchInMsgs,
    seacrhinputChangeHandler,
    searchInputValue,
    clearInput,
  } = props;

  return (
    <div className={styles.SearchTab}>
      <div className={styles.BackArrowSvg} onClick={toggleSearchInMsgs}>
        <BackArrowIcon className={styles.BackArrowSvg} />
      </div>
      <Input
        onChange={seacrhinputChangeHandler}
        placeholder={'Search message'}
        type={'text'}
        value={searchInputValue}
        className={styles.Input}
        inputRef={inputRef}
      />
      {isSearching && (
        <div className={styles.EscIconContainer} onClick={clearInput}>
          <CircularSpinner className={styles.EscIconSvg} />
        </div>
      )}
      {!isSearching && (
        <div className={styles.EscIconContainer} onClick={clearInput}>
          <EscIcon className={styles.EscIconSvg} />
        </div>
      )}
    </div>
  );
}

SearchTab.propTypes = {
  inputRef: PropTypes.object.isRequired,
  isSearching: PropTypes.bool,
  searchInputValue: PropTypes.string,
  toggleSearchInMsgs: PropTypes.func,
  seacrhinputChangeHandler: PropTypes.func,
  clearInput: PropTypes.func,
};
