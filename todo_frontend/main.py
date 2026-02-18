"""
Small standalone module demonstrating simple addition with a CLI.

This file is intentionally independent of the React app code. It can be run with:

    python main.py 1 2
"""

from __future__ import annotations

import argparse


# PUBLIC_INTERFACE
def add(a: float, b: float) -> float:
    """Return the sum of a and b.

    Args:
        a: First operand.
        b: Second operand.

    Returns:
        The numeric sum of a and b.

    Raises:
        TypeError: If a or b is not a number.
    """
    if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
        raise TypeError("add(a, b) requires numeric arguments (int or float).")
    return a + b


def _build_parser() -> argparse.ArgumentParser:
    """Create an argument parser for the CLI."""
    parser = argparse.ArgumentParser(description="Add two numbers and print the result.")
    parser.add_argument("a", type=float, help="First number")
    parser.add_argument("b", type=float, help="Second number")
    return parser


def main(argv: list[str] | None = None) -> int:
    """CLI entrypoint. Parses args and prints the sum.

    Args:
        argv: Optional argv list (defaults to sys.argv via argparse when None).

    Returns:
        Process exit code (0 for success).
    """
    parser = _build_parser()
    args = parser.parse_args(argv)
    result = add(args.a, args.b)
    print(result)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
