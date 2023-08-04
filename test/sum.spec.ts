import mySum from '@main/config/sum'


describe('mySum', () => {
    it('should return the sum of 1 and 2', () => {
      // Call the function
      const result = mySum();
  
      // Assert the result is equal to 3
      expect(result).toBe(3);
    });
  });