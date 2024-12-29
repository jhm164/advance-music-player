import ffmpeg
import os

def create_dash_chunks(input_file, output_dir, qualities):
    """
    Divides an MP3 file into DASH-compliant streams with multiple qualities,
    ensuring all files are placed in the specified output directory.

    :param input_file: Path to the input MP3 file
    :param output_dir: Directory to save the output files
    :param qualities: List of bitrates (e.g., ['64k', '128k', '192k'])
    """
    # Ensure the output directory exists
    os.makedirs(output_dir, exist_ok=True)

    for quality in qualities:
        # Create subfolder for chunks
        chunk_folder = os.path.join(output_dir, "song2")
        dash_chunks_path = os.path.join("song2")
        os.makedirs(chunk_folder, exist_ok=True)

        output_mpd = os.path.join(output_dir, f"output_{quality}.mpd")
        init_segment = f"init_{quality}.m4s"
        media_segment_template = f"chunk_{quality}_$Number$.m4s"

        print(f"Processing quality: {quality}")
        
        # Run FFmpeg command
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
                init_seg_name=os.path.join(chunk_folder, init_segment),
                media_seg_name=os.path.join(chunk_folder, media_segment_template)
            )
            .run(overwrite_output=True)
        )
        
        print(f"Created DASH chunks and MPD for quality: {quality}")

# Example usage
if __name__ == "__main__":
    input_mp3 = "song2.mp3"  # Input MP3 file
    output_directory = "song2"  # Output directory
    quality_levels = ['64k', '128k', '192k']  # Bitrate options

    create_dash_chunks(input_mp3, output_directory, quality_levels)
