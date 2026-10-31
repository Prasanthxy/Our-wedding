"""Crop reference art to regions without other couples' printed text."""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "images"
SRC = ROOT / "assets" / "images" / "_source"


def crop_rel(src_name: str, out_name: str, box_ratio: tuple[float, float, float, float]) -> None:
    """box_ratio: (left, top, right, bottom) as 0–1 fractions of width/height."""
    path = SRC / src_name
    if not path.exists():
        path = ROOT / "assets" / "images" / src_name
    if not path.exists():
        path = Path(__file__).resolve().parents[2] / "References" / src_name
    im = Image.open(path).convert("RGB")
    w, h = im.size
    l, t, r, b = box_ratio
    box = (int(w * l), int(h * t), int(w * r), int(h * b))
    cropped = im.crop(box)
    out = OUT / out_name
    cropped.save(out, quality=88, optimize=True)
    print(f"{out_name}: {cropped.size} from {src_name} {im.size}")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)

    # Feet + torans (no printed text on this reference)
    crop_rel("story-feet-garlands.jpg", "story-begin.jpg", (0.0, 0.0, 1.0, 0.48))

    # Sapthapadi illustration band at top
    crop_rel("story-sapthapadi.jpg", "story-steps.jpg", (0.0, 0.0, 1.0, 0.36))

    # Banana leaf + petal corners (bottom art, no text)
    crop_rel("story-sapthapadi.jpg", "story-path.jpg", (0.0, 0.72, 1.0, 1.0))

    # Watercolour couple — art below template typography
    crop_rel("story-couple.jpg", "story-couple-art.jpg", (0.06, 0.52, 0.94, 1.0))

    # Mehendi illustration — trim side punch borders and bottom text block
    crop_rel("story-mehendi.jpg", "story-mehendi-art.jpg", (0.1, 0.0, 0.9, 0.5))

    # Ceremony: feet + garlands centre crop
    crop_rel("story-feet-garlands.jpg", "event-ceremony-art.jpg", (0.08, 0.02, 0.92, 0.42))

    # Venue: gopuram + sky (crop seated figures at bottom)
    crop_rel("venue-temple.jpg", "venue-temple-clean.jpg", (0.0, 0.0, 1.0, 0.78))


if __name__ == "__main__":
    main()
