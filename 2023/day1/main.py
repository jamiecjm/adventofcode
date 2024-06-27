import re


class Solution:
    def solve(self, file):
        total = 0
        # Read input from input.txt
        with open(file, 'r') as f:
            lines = f.readlines()
        for line in lines:
            # Find all digits in the line
            digits = re.findall(r'(\d)', line.strip())
            total += int(digits[0] + digits[-1])
        return total

    def solve2(self, file):
        word_mappings = {'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5',
                         'six': '6', 'seven': '7', 'eight': '8', 'nine': '9'}
        total = 0
        # Read input from input.txt
        with open(file, 'r') as f:
            lines = f.readlines()
        for line in lines:
            # Find all digits in the line
            digits = re.findall(
                fr'(?=([\d]|{"|".join(word_mappings)}))', line.strip())
            total += int((word_mappings.get(digits[0]) or digits[0]) +
                         (word_mappings.get(digits[-1]) or digits[-1]))
        return total


if __name__ == '__main__':
    s = Solution()
    print('Part 1')
    print(f"- Sample: {s.solve('sample.txt')}")
    print(f"- Actual: {s.solve('input.txt')}")

    print('Part 2')
    print(f"- Sample: {s.solve2('sample2.txt')}")
    print(f"- Actual: {s.solve2('input.txt')}")
