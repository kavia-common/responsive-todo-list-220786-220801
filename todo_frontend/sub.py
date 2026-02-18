"""
Small standalone module demonstrating simple subtraction with a CLI.

This file is intentionally independent of the React app code. It can be run with:

    python sub.py 5 3
"""

from __future__ import annotations

import argparse


# PUBLIC_INTERFACE
def subtract(a: float, b: float) -> float:
    """Return the difference of a and b.

    Args:
        a: First operand (minuend).
        b: Second operand (subtrahend).

    Returns:
        The numeric difference of a minus b.

    Raises:
        TypeError: If a or b is not a number.
    """
    if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
        raise TypeError("subtract(a, b) requires numeric arguments (int or float).")
    return a - b


def _build_parser() -> argparse.ArgumentParser:
    """Create an argument parser for the CLI."""
    parser = argparse.ArgumentParser(description="Subtract two numbers and print the result.")
    parser.add_argument("a", type=float, help="First number (minuend)")
    parser.add_argument("b", type=float, help="Second number (subtrahend)")
    return parser


def main(argv: list[str] | None = None) -> int:
    """CLI entrypoint. Parses args and prints the difference.

    Args:
        argv: Optional argv list (defaults to sys.argv via argparse when None).

    Returns:
        Process exit code (0 for success).
    """
    parser = _build_parser()
    args = parser.parse_args(argv)
    result = subtract(args.a, args.b)
    print(result)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
