import re
import os

__location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))


class Solution:
    cubes = {'red': 12, 'green': 13, 'blue': 14}

    def solve(self, file):
        total = 0
        # Read input from input.txt
        with open(os.path.join(__location__, file), 'r') as f:
            lines = f.readlines()
        for line in lines:
            line = line.strip()
            game = re.findall(r'Game (\d+):', line)[0]

            if self.check_validity(line, 'red') and self.check_validity(line, 'green') and self.check_validity(line, 'blue'):
                total += int(game)

        return total

    def check_validity(self, line, colour):
        counts = map(int, re.findall(rf'(\d+) {colour}', line))

        for count in counts:
            if count > self.cubes[colour]:
                return False

        return True

    def solve2(self, file):
        total = 0
        # Read input from input.txt
        with open(os.path.join(__location__, file), 'r') as f:
            lines = f.readlines()
        for line in lines:
            line = line.strip()

            total += (self.find_smallest(line, 'red') * self.find_smallest(line,
                      'green') * self.find_smallest(line, 'blue'))

        return total

    def find_smallest(self, line, colour):
        counts = list(map(int, re.findall(rf'(\d+) {colour}', line)))

        return max(counts)


if __name__ == '__main__':
    s = Solution()
    print('Part 1')
    print(f"- Sample: {s.solve('sample.txt')}")
    print(f"- Actual: {s.solve('input.txt')}")

    print('Part 2')
    print(f"- Sample: {s.solve2('sample.txt')}")
    print(f"- Actual: {s.solve2('input.txt')}")
