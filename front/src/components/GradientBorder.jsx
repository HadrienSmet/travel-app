import { useEffect } from 'react';
import { useRef } from 'react';

export const findDegree = (element, event) => {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const degreeRadian = Math.atan2(y, x);
    const degree = (degreeRadian * 180) / Math.PI + 180;

    return degree;
}

const useGradientBorder = () => {
    const ref = useRef()

    useEffect(() => {
        const handleMouseMove = (event) => {
            const degree = findDegree(ref.current, event);

            ref.current.style.setProperty("--gradient-rotation", `${degree + 200}deg`)
        }

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        }
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [])

    return ref;
}

const GradientBorder = ({ children }) => {
    const ref = useGradientBorder()
    return (
        <div ref={ref} className='gradient'>
            {children}
        </div>
    );
};

export default GradientBorder;