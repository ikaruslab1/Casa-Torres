import { motion as Motion } from 'framer-motion';

const PageTransition = ({ children }) => {
    return (
        <Motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
        >
            {children}
        </Motion.div>
    );
};

export default PageTransition;
