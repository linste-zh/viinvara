# Vinvara
cite as (APA 7): Steiner, Linda. (2025). *Vinvara* (Version 3.0) [Computer software]. GitHub. https://linste-zh.github.io/vinvara/

---

## The "video interval variable rater"

Vinvara allows users to rate some variable on a scale while watching a local video file. The conditions are customisable and can be downloaded in the form of JSON files for convenience or remote experiments. Results are presented in an interactive graph and can be downloaded as a CSV or JPEG.

## Feedback and Error Reports

Please address your feedback or error reports to linste.zh@gmail.com

## Last Update (V4)
* Name changed from 'Viinvara' to 'Vinvara'
* **Settings** added option to automatically rate lowest when rating missed
* minor bug fixes and improvements

## Future Updates

* scale option (instead of buttons)
* online video sources (youtube, drive, etc.)
* accessibility improvements

## Inspiration

This software is based on [Peter Macintyre’s Idiodynamic Software](https://petermacintyre.weebly.com/idiodynamic-software.html) (e.g. [Macintyre  and Legatto, 2011](https://doi.org/10.1093/applin/amq037)) / the [Anion Variable Tester](https://80113hunterhsu.github.io/VariableTester/) developed by Hunter Hsu.  
It  was originally created as part of a idiodynamic, linguistic pilotstudy in a seminar project at the [English Department of the Univeristy of Zurich](https://www.es.uzh.ch/en.html).

---

# Usage

## Regular Experiment
Adjust the experiment settings to your purpose. You can downlaod them as *minimal* (works on homepage) settings file so they can be reused.
Load a local video file into the experiment and press start. The experiment will run until the end of the video or until cancelled (by returning home or by continuing to the results).  
Analysye your results in the interactive graph with the video file side-by-side and download your data as CSV and JPEG.

## Remote Experiment
Create a *full* settings file on the "Create Experiment" page. This can optionally include a message to the participant(s).
Send the settings and video file to your participant.
They can upload the file on the "Load Experiment" page and adjust their name. They will see the message (optionally) but cannot change any of the settings.
Participants can start the experiment by uploading the video file as per usual.
Participants can analyse their results in the interactive graph. They can manually download and send you the data as CSV or JPEG.

## Scaling
Vinvara should scale well on all laptop screens but does not work well on mobile.

## Experiment Settings

**Participant Name**: can be freely chosen, will appear during the experiment, in the data graph, and in the filenames of the result downloads
**Variable**:  can be freely chosen, will appear during the experiment, in the data graph, and in the filenames of the result downloads  

### Scale Settings  

  - **Rating Scale**:  takes any full number (i.e. integer) inputs, positive and negative, max. difference is 10  
  - **Add Labels**: if activated and filled out, labels will be shown beneath the corresponding label buttons during the experiment. Not all labels need to be provided.  

### Interval Settings

  - **Interval**: in seconds the interval at which the participant will be requested to provide a rating, minimum. 1s.  
  - **Rating at Start of Video**: request rating before video starts
  - **Rating at End of Video**: request rating at end of video
  
### Rating Behaviour Settings

  - **Pause to rate**:  pause video when rating scale appears until a rating is provided
  - **Notification Sound at Interval**:  test out the different options with the play button
  - **Behaviour when rating not provided in time**:  the rating scale will disappear automatically half a second before the next interval is hit. If no rating is provided in that time, select whether the system should pause to enfore a rating ("pause"), provide the numerically middle rating (e.g. on a scale -3 to -3 => 0; 1 to 7 => 4; 1 to 4 => 2.5, etc.) ("neutral"), provide the numerically lowest rating (e.g. on a scale 1 to 7 => 0)("lowest"), or omit the datapoint ("leave out")

### Video Settings:

  - **Show video controls during experiment**:  if enabled, the participant can pause the video and change the current time stamp. This can override any pausing behaviour specified above. 
  - **(removed in V3) Allow fullscreen**: if enabled, the participant can also enter full screen (which hides the rating scale at the interval). This feature was removed in V3 of Vinvara due to the lack of browser support.

## Experiment

### Video Source

Currently, only a local video file can be selected. I am not aware of any size limitations applying.

### Keyboard Input

When a user rating is actively being requested, it can be provided either by clicking the on-screen buttons or by using the keyboard keys. The keys are mapped spatially irrelevant of the value they represent, meaning the left-most point on the scale = key "1"; the second = key "2", etc.

### Reloading the Page

If they page is reloaded while the experiment is active, the video source needs to be reloaded. During this process, you will be prompted on whether you want to continue with your existing data points ("OK") or remove them and start the experiment again from scratch ("CANCEL"). If the old datapoints are kept, the video is loaded at the last rated interval.

### Returning to Start Page

The home button allows you to return to the starting page, but will reset your settings and remove any collected data points.

### Continue

The continue button allows you to end the experiment prematurely and proceed to the results page.

## Results

### Interval vs Timestamp Graph

There are two possible display options: one where the data points are set at their associated intervals (e.g. 10s, 20s, 30s, etc.) and one where they are set at the actual time of input (e.g. 12.3s, 20.5s, 38s, etc.). 

### Show Video and interact with Graph

On the right hand side, a video player can be activated. Reload the video file from your experiment into it and compare points in the graph to their corresponding time stamps.  
A line in the graph marks the current time stamp of the video. It can be moved by either clicking somewhere in the graph (the video is updated accordingly) or by changing the timestamp within the videoplayer (the graph line is updated accordingly).  
To hide the video and time indication line in the graph, click on "Hide Video"

### Download as CSV or JPEG

Data can be saved anywhere on your device as a CSV (Interval, Timestamp, and Rating). The currently visible graph can also be downlodaded as a JPEG. In order to download both version of the graph, click the button once with each view active. The default name has format is "Year_Month_Date_ParticipantName_Variable".

---

# Use of AI and online Sources Disclaimer

Small portions of the code were generated in collaboration with ChatGPT or taken from online tutorials. Insofar as sections were directly copied and modified only mildly, they are indicated within the code in the form of comments.

# Icon Credits
Icons (here referenced as in the code)were taken from flaticon.com for free from the following makers:
*  th studio: [arrow_icon](https://www.flaticon.com/free-icon/down-arrow_2985150?term=arrow+down&page=1&position=2&origin=search&related_id=2985150)
* Freepik: [home_icon](https://www.flaticon.com/free-icon/home_1946436?term=home&page=1&position=3&origin=tag&related_id=1946436*/), [help_icon](https://www.flaticon.com/free-icon/question_471715?term=question+mark&page=1&position=20&origin=search&related_id=471715*/), [refresh](https://www.flaticon.com/free-icon/refresh_545661?term=change&page=1&position=1&origin=search&related_id=545661*/), [exit_icon](https://www.flaticon.com/free-icon/exit_1286853?term=exit&page=1&position=1&origin=search&related_id=1286853*/)
* Kiranshasty [download_doc](https://www.flaticon.com/free-icon/file_1092000?term=download+document&page=1&position=1&origin=search&related_id=1092000), [upload_doc](https://www.flaticon.com/free-icon/file_1092216?term=upload+document&page=1&position=1&origin=search&related_id=1092216*/), [download_graph](https://www.flaticon.com/free-icon/line-chart_1153359?term=graph&page=1&position=48&origin=style&related_id=1153359)
* abdul allib: [play_icon](https://www.flaticon.com/free-icon/play_3318660?term=play&page=1&position=1&origin=style&related_id=3318660)
* Prashanth Rapolu 15: [playing_icon](https://www.flaticon.com/free-icon/sound-waves_7582349?term=playing+sound&page=1&position=1&origin=search&related_id=7582349)
* Hilmy Abiyyu A.: [upload_vid](https://www.flaticon.com/free-icon/upload_4620095?term=video+upload&page=1&position=3&origin=search&related_id=4620095*/)

---

# Previous Major Update Tracker

## V3
* **Homepage**: *minimal* settings can be downloaded and uploaded as JSON files
* **Create Remote Experiment (new)**: allows for the creation of a *full* settings file including message to participants
* **Load Remote Experiment (new)**: requires a *full* settings file, gives participants option to input their name and see a message but not change any settings
* Experiment: video source can be changed via button after initial loading (instead of having to reload the page), additional icons added for clearer buttons
* Allow Fullscreen (removed): the allow fullscreen option was removed due to lacking browser support. The video controls option now includes fullscreen per default.
* Updates Headers: difference between home pages and experiment pages
* Bug fixes: multiple bugs were fixed, including the behaviour of missed ratings intercepting with the end-of-video rating
* Modularisation and reorganisation of code: code was modularised and reorganised heavily