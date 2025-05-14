# Viinvara
cite as (APA 7): Steiner, Linda. (2025). *Viinvara* (Version 1.2) [Computer software]. GitHub. https://github.com/linste-zh/viinvara

---

## The "video interval variable rater"

Viinvara allows users to rate some variable on a scale while watching a video. The conditions are customisable. Results are presented in an interactive graph and can be downloaded as a CSV or JPEG.

## Feedback and Error Reports

Please address your feedback or error reports to linste.zh@gmail.com

## Future Updates

TBD

## Inspiration

This software is based on [Peter Macintyre’s Idiodynamic Software](https://petermacintyre.weebly.com/idiodynamic-software.html) (e.g. [Macintyre  and Legatto, 2011](https://doi.org/10.1093/applin/amq037)) / the [Anion Variable Tester](https://80113hunterhsu.github.io/VariableTester/) developed by Hunter Hsu.  
It  was originally created as part of a idiodynamic, linguistic pilotstudy in a seminar project at the [English Department of the Univeristy of Zurich](https://www.es.uzh.ch/en.html).

---

# Usage

Adjust the experiment settings to your purpose.  
Load a local video file into the experiment and press start. The experiment will run until the end of the video or until cancelled (by returning home or by continuing to the results).  
Analysye your results in the interactive graph with the video file side-by-side and download your data as CSV and JPEG.

## Scaling
Viinvara should scale well on all laptop screens but does not work well on mobile.

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
  - **Behaviour when rating not provided in time**:  the rating scale will disappear automatically half a second before the next interval is hit. If no rating is provided in that time, select whether the system should pause to enfore a rating ("pause"), provide the numerically middle rating (e.g. on a scale -3 to -3 => 0; 1 to 7 => 4; 1 to 4 => 2.5, etc.) ("neutral"), or omit the datapoint ("leave out")

### Video Settings:

  - **Show video controls during experiment**:  if enabled, the participant can pause the video and change the current time stamp. This can override any pausing behaviour specified above. 
  - **Allow fullscreen**: if enabled, the participant can also enter full screen (which hides the rating scale at the interval)

## Experiment

### Video Source

Currently, only a local video file can be selected. I am not aware of any size limitations applying.

### Keyboard Input

When a user rating is actively being requested, it can be provided either by clicking the on-screen buttons or by using the keyboard keys. The keys are mapped spatially irrelevant of the value they represent, meaning the left-most point on the scale = key "1"; the second = key "2", etc.

### Reloading the Page

If they page is reloaded while the experiment is active, the video source needs to be reloaded. During this process, you will be prompted on whether you want to continue with your existing data points ("OK") or remove them and start the experiment again from scratch ("CANCEL"). If the old datapoints are kept, the video is loaded at the last rated timestamp.

### Returning to Start Page

The home button allows you to return to the starting page, but will reset your settings and remove any collected data points.

### Continue

The continue button allows you to end the experiment prematurely and proceed to the results page.

## Results

### Show Video and interact with Graph

On the right hand side, a video player can be activated. Reload the video file from your experiment into it and compare points in the graph to their corresponding time stamps.  
A line in the graph marks the current time stamp of the video. It can be moved by either clicking somewhere in the graph (the video is updated accordingly) or by changing the timestamp within the videoplayer (the graph line is updated accordingly).  
To hide the video and time indication line in the graph, click on "Hide Video"

### Download as CSV or JPEG

Data can be saved anywhere on your device as a CSV (Timestamp and Rating), or JPEG (graph). The default name has format is "Year_Month_Date_ParticipantName_Variable".

---

# Use of AI and online Sources Disclaimer

Small portions of the code were generated in collaboration with ChatGPT or taken from online tutorials. Insofar as sections were directly copied and modified only mildly, they are indicated within the code in the form of comments.