import { renderHook, act } from '@testing-library/react-hooks';
import useField from '../useField';
import '@testing-library/jest-dom/extend-expect';

describe('useField', () => {
  it('should update value when onChange is called', () => {
    const { result } = renderHook(() => useField('text'));

    act(() => {
      result.current.onChange({ target: { value: 'test value' } });
    });

    expect(result.current.value).toBe('test value');
  });

  it('should return correct type', () => {
    const { result } = renderHook(() => useField('text'));
    expect(result.current.type).toBe('text');
  });
});