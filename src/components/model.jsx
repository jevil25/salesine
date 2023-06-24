import React, { FC, Fragment } from "react";
import { IoClose } from "react-icons/io5";
import { Dialog, Transition } from "@headlessui/react";


const Modal = ({
  children,
  title,
  size,
  onClose,
  showModal,
  rounded = "2xl",
}) => {
  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog as="div" className="relative z-[900] " onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div
          className={`fixed inset-0 z-10  p-4 md:p-8 overflow-y-auto ${
            size === "small" && "w-80 mx-auto"
          }`}>
          <div className="flex min-h-full items-center justify-center text-center py-5 md:py-7">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel
                className={`w-full max-w-2xl transform overflow-hidden rounded-${rounded} bg-gray-700/70 text-gray-100 backdrop-blur-xl text-left align-middle shadow-xl transition-all`}>
                <Dialog.Title
                  as="div"
                  className={`flex justify-between items-center md:p-6 p-5 ${
                    size === "small" && "md:pb-2"
                  }`}>
                  <h3
                    className={`bodyFont text-lg font-medium leading-6 text-white ${
                      size === "small" && "text-center"
                    }`}>
                    {title}
                  </h3>
                  {size !== "small" && (
                    <button
                      className="hover:text-white text-gray-400 transition-colors"
                      onClick={onClose}>
                      <IoClose size="1.4rem" />
                    </button>
                  )}
                </Dialog.Title>
                {size !== "small" && <hr className="opacity-30" />}
                <div>{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
