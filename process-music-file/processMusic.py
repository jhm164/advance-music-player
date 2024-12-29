import ffmpeg
import os

def create_dash_chunks(input_file, output_dir, qualities):
    """
    Divides an MP3 file into chunks and generates DASH-compliant streams in multiple qualities.
    
    :param input_file: Path to the input MP3 file
    :param output_dir: Directory to save the output files
    :param qualities: List of bitrates (e.g., ['64k', '128k', '192k'])
    """
    # Ensure the output directory exists
    os.makedirs(output_dir, exist_ok=True)

    for quality in qualities:
        # Define paths for MPD, initialization, and media segments
        output_mpd = os.path.join(output_dir, f"output_{quality}.mpd")
        init_segment = os.path.join(output_dir, f"output_{quality}_init.mp4")
        media_segment_template = os.path.join(output_dir, f"output_{quality}_$Number$.m4s")

        print(f"Processing quality: {quality}")

        # Generate the DASH stream for the current quality
        (
            ffmpeg
            .input(input_file)
            .output(
                output_mpd,
                c='aac',                # Audio codec
                b=f'{quality}',         # Audio bitrate
                f='dash',               # DASH output format
                segment_time=4,         # Chunk duration (4 seconds)
                use_timeline=1,         # Use timeline for DASH manifest
                use_template=1,         # Use template for segment names
                init_seg_name=init_segment,  # Initialization segment
                media_seg_name=media_segment_template  # Media segment name template
            )
            .run(overwrite_output=True)
        )
        print(f"Created DASH chunks and MPD for quality: {quality}")

# Example usage
if __name__ == "__main__":
    input_mp3 = "song.mp3"  # Input MP3 file
    output_directory = "dash_chunks"  # Output directory (all files will be in this folder)
    quality_levels = ['64k', '128k', '192k']  # Bitrate options

    create_dash_chunks(input_mp3, output_directory, quality_levels)
