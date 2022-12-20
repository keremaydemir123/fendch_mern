import { useCallback, useEffect, useId, useRef, useState } from 'react';
import styles from './select.module.css';

export type SelectOption = {
  label: string;
  value: string;
};

type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

type SelectProps = {
  options: SelectOption[];
  label?: string;
} & (SingleSelectProps | MultipleSelectProps);

export function Select({
  multiple,
  value,
  onChange,
  options,
  label,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();

  function clearOptions() {
    return multiple ? onChange([]) : onChange(undefined);
  }

  const selectOption = useCallback(
    (option: SelectOption) => {
      if (multiple) {
        if (value.includes(option)) {
          onChange(value.filter((o) => o !== option));
        } else {
          onChange([...value, option]);
        }
      } else if (option !== value) onChange(option);
    },
    [multiple, value, onChange]
  );

  function isOptionSelected(option: SelectOption) {
    return multiple ? value.includes(option) : option === value;
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target !== containerRef.current) return;
      switch (e.code) {
        case 'Enter':
        case 'Space':
          setIsOpen((prev) => !prev);
          if (isOpen) selectOption(options[highlightedIndex]);
          break;
        case 'ArrowUp':
        case 'ArrowDown': {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const newValue = highlightedIndex + (e.code === 'ArrowDown' ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue);
          }
          break;
        }
        case 'Escape':
          setIsOpen(false);
          break;

        default:
          break;
      }
    };
    containerRef.current?.addEventListener('keydown', handler);

    const refCopy = containerRef.current;
    return () => {
      refCopy?.removeEventListener('keydown', handler);
    };
  }, [isOpen, highlightedIndex, options, selectOption]);

  return (
    <div className={styles.select}>
      <label htmlFor={id}>{label}</label>
      <div
        ref={containerRef}
        onBlur={() => setIsOpen(false)}
        onClick={() => setIsOpen((prev) => !prev)}
        tabIndex={0}
        className={styles.container}
        role="button"
        id={id}
      >
        <span className={styles.value}>
          {multiple
            ? value.map((v) => (
                <button
                  key={v.value}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectOption(v);
                  }}
                  type="button"
                  className={styles['option-badge']}
                >
                  {v.label}
                  <span className={styles['remove-btn']}>&times;</span>
                </button>
              ))
            : value?.label}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            clearOptions();
          }}
          type="button"
          className={styles['clear-btn']}
        >
          &times;
        </button>
        <ul className={`${styles.options} ${isOpen ? styles.show : ''}`}>
          {options.map((option, index) => (
            <div
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option);
                setIsOpen(false);
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              key={option.value}
              className={`${styles.option} ${
                isOptionSelected(option) ? styles.selected : ''
              } ${index === highlightedIndex ? styles.highlighted : ''}`}
            >
              {option.label}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

Select.defaultProps = {
  label: '',
};
