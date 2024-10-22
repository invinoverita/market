'use client';
import { FC, Fragment, ReactNode, useEffect, useState } from 'react';

import { createPortal } from 'react-dom';

import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

type TypeToast = {
  content?: ReactNode;
  onClose?: (e?: any) => void;
  onHide?: () => void;
  autoClose?: boolean;
  type?: 'error' | 'success';
};

const Toast: FC<TypeToast> = ({
  content,
  onClose = () => {},
  onHide = () => {},
  type = 'success',
  autoClose = false,
}) => {
  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    if (autoClose) {
      if (!seconds) {
        return onHide();
      }

      const interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [seconds]);

  return createPortal(
    <div className="fixed bottom-4 right-4 cursor-pointer hover:opacity-80">
      <div
        className="mb-4 flex w-full max-w-xs items-center rounded-lg bg-slate-50 p-4 shadow-md"
        role="alert"
      >
        <div
          className={`inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${type === 'success' ? 'bg-green-100 text-green-500' : ''} ${type === 'error' ? 'bg-red-100 text-red-500' : ''}`}
        >
          {autoClose ? (
            seconds
          ) : (
            <Fragment>
              {type === 'success' ? (
                <CheckCircleIcon className="h-5 w-5" />
              ) : null}
              {type === 'error' ? (
                <ExclamationTriangleIcon className="h-5 w-5" />
              ) : null}
            </Fragment>
          )}
        </div>
        <div className="ms-3 text-sm font-normal">{content}</div>
        <button
          type="button"
          onClick={onClose}
          className="-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300"
          data-dismiss-target="#toast-success"
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg
            className="h-3 w-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    </div>,
    document.body,
  );
};

export { Toast };
