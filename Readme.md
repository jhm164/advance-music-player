### Download and Extract ffmpeg
https://github.com/BtbN/FFmpeg-Builds/releases

*** Extract it in c:\ drive *** 
E.g c:\ffmpeg

### Install ffmpeg
pip install ffmpeg-python

### set enviroment path
setx /m PATH "C:\ffmpeg\bin;%PATH%"


###  Qualities:

The script accepts multiple quality levels (e.g., 64k, 128k, 192k) to generate adaptive bitrate streaming options.
Chunks:

Each quality level produces .mpd (manifest) and corresponding .m4s (media segments) files.
Key FFmpeg Options:

-c:a aac: Converts audio to AAC codec (DASH-compatible).
-b:a <bitrate>: Sets the audio bitrate for different quality levels.
-f dash: Specifies DASH output format.
-segment_time 4: Splits audio into 4-second chunks.
Output Directory:

DASH chunks for each quality level are saved in the specified directory.


### How to serve content 
 - go to `process-music-file\dash_chunks`
 - start server to host chunks and its mpd files by running following command
    `python process-music-file\startBackend.py` 
 - Run command to start front end
    `python -m http.server 4000 --bind 0.0.0.0`
