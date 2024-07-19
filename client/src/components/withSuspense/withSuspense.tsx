import { ComponentType, Suspense } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const withSuspense = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const ComponentWithSuspense = (props: P) => {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  }

  return ComponentWithSuspense;
};

export default withSuspense;
