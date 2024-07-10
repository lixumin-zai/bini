import * as React from "react"
import Svg, { Path, G, SvgProps } from "react-native-svg"

interface SanrioProps extends SvgProps {}

const Sanrio: React.FC<SanrioProps> = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 800 800"
      xmlSpace="preserve"
      enableBackground="new 0 0 800 800"
      {...props}
    >
      <Path d="M755.903 255.773c-3.016-9.794-8.808-16.897-17.221-21.096-25.197-12.57-69.376 3.396-101.633 15.051-31.919 11.527-58.497 7.159-86.625 2.537-8.117-1.339-16.502-2.72-25.183-3.749-39.515-4.665-56.44 9.583-57.13 10.189a3.376 3.376 0 00-.55.634c-20.349-7.145-56.707-15.755-98.378-6.666-34.329 7.497-57.962 20.603-72.505 31.144-14.924 0-51.155 3.269-82.623 31.637-34.85 31.44-44.588 33.709-76.873 41.248-3.72.86-7.723 1.804-12.091 2.861-7.582 1.832-14.726 3.227-21.632 4.594-30.665 6.046-54.889 10.809-62.203 45.828-3.269 15.685 1.846 31.412 14.402 44.292 15.938 16.375 40.882 25.634 66.924 25.634 6.482 0 13.035-.564 19.532-1.747 48.844-8.892 88.767-44.898 103.029-65.966 1.141 5.313 2.973 10.203 5.524 14.656 10.161 17.728 30.876 28.015 61.569 30.552 2.086.169 4.157.324 6.243.451-7.68 9.47-11.33 24.788-12.909 33.976-2.988-3.749-7.469-7.92-13.219-9.104-5.609-1.156-11.232.676-16.728 5.44-12.472 10.837-14.712 35.301-9.681 52.691 3.889 13.416 11.499 21.646 21.448 23.154 20.617 3.157 31.355-6.708 35.217-11.443 13.064 6.652 56.031 12.655 88.274 10.062 28.086-2.269 43.869-5.778 49.295-7.159 2.325 3.495 8.258 10.386 20.011 13.359 2.818.719 5.496 1.085 8.047 1.085 7.892-.014 14.543-3.453 20.166-10.499 9.752 4.143 20.067 6.201 29.988 6.201 11.668 0 22.773-2.861 31.679-8.54 13.374-8.512 20.73-22.632 20.73-39.768 0-28.833-6.905-50.521-19.955-62.682-9.54-8.892-22.238-12.852-37.781-11.767-14.022.972-24.394 4.848-32.018 9.611a30.35 30.35 0 001.367-5.595c.958-6.482-.113-12.852-2.818-18.278 14.811-4.918 55.016-21.773 53.508-59.371-.409-10.287-2.311-19.49-5.017-27.579 17.911 9.921 52.071 21.843 90.205 21.829 16.333 0 33.427-2.184 50.267-7.666 56.694-18.433 81.243-54.903 67.348-100.041z" />
      <Path
        d="M750.514 257.438c-2.579-8.385-7.286-14.191-14.36-17.714-23.027-11.499-65.896 3.988-97.194 15.304-33.3 12.035-60.583 7.553-89.458 2.804-8.047-1.339-16.375-2.706-24.915-3.706-29.608-3.495-45.631 4.256-50.859 7.511 6.581 2.593 10.485 4.636 11.048 4.932a2.808 2.808 0 011.17 3.805 2.82 2.82 0 01-3.819 1.17c-.493-.268-51.07-26.592-111.752-13.359-29.382 6.412-50.803 17.221-65.106 26.691a146.386 146.386 0 00-6.637 4.65c-10.696 7.948-15.797 14.05-15.924 14.191a2.828 2.828 0 01-2.184 1.043c-.62 0-1.254-.211-1.776-.648-1.212-.972-1.381-2.748-.409-3.96.38-.465 3.791-4.552 10.611-10.301-16.826 1.282-45.899 7.046-71.124 29.805-35.935 32.398-46.885 34.949-79.368 42.53-3.706.874-7.694 1.804-12.049 2.847-7.694 1.86-14.91 3.284-21.871 4.65-30.848 6.088-51.225 10.09-57.764 41.459-2.875 13.782 1.705 27.705 12.909 39.205 18.644 19.137 50.591 27.875 81.411 22.266 51.874-9.428 94.517-51.845 102.817-69.39-1.127-16.995 3.889-37.443 14.938-60.47.662-1.395 2.353-1.987 3.763-1.311 1.395.662 1.987 2.353 1.311 3.763-10.146 21.152-15.008 39.867-14.515 55.411.028 1.226.099 2.438.211 3.622.662 7.441 2.635 14.064 5.933 19.814 9.188 16.023 28.41 25.366 57.158 27.748 3.847.324 7.694.564 11.542.719 1.127.056 2.255.099 3.382.127 53.945 1.776 105.748-10.118 118.276-13.233a15.347 15.347 0 01-.268-2.466c-.197-7.356 4.566-15.191 12.133-19.926 8.949-5.623 19.828-5.862 29.847-.676 3.495 1.804 6.482 4.34 8.864 7.356 12.373-3.904 52.367-19.236 50.972-54.241a91.896 91.896 0 00-7.004-31.863c-9.09-21.97-23.774-33.878-23.985-34.033a2.824 2.824 0 01-.465-3.96 2.824 2.824 0 013.96-.465c.874.691 15.304 12.345 24.859 34.061.24.085.465.197.676.338 20.687 13.782 82.44 36.076 141.303 16.925 54.13-17.617 76.748-50.649 63.712-93.025zm-433.45 179.099c-5.2 3.763-12.359 6.384-20.152 7.356a53.305 53.305 0 01-6.595.423c-13.923 0-24.788-5.792-25.873-14.459-.634-5.073 2.142-10.146 7.849-14.261 5.2-3.763 12.359-6.384 20.152-7.356 16.953-2.128 31.214 4.03 32.469 14.036.056.479.085.944.085 1.423-.001 4.594-2.763 9.103-7.935 12.838zm23.083-53.96l-51.084 17.263a2.527 2.527 0 01-.902.155 2.82 2.82 0 01-2.663-1.917 2.792 2.792 0 011.762-3.565l51.084-17.263a2.792 2.792 0 013.565 1.762 2.792 2.792 0 01-1.762 3.565zm89.261 12.655c-.916 3.847-5.003 6.764-11.513 8.216-4.707 1.057-8.568.197-11.964-.564-3.495-.775-6.525-1.452-10.316-.211-2.72.888-5.524 2.396-8.244 3.847-3.875 2.072-7.835 4.199-11.358 4.199-1.818 0-3.509-.564-5.031-1.959-4.918-4.538-2.762-11.838-.719-15.445a2.832 2.832 0 013.847-1.057 2.815 2.815 0 011.057 3.833c-.042.085-3.185 5.919-.366 8.526 1.536 1.423 5.792-.86 9.907-3.058 2.931-1.578 5.961-3.199 9.146-4.242 5.285-1.719 9.54-.775 13.303.07 3.1.691 6.031 1.339 9.512.564 4.566-1.029 6.962-2.804 7.243-4.03.225-.902-.691-2.297-2.438-3.734a2.815 2.815 0 01-.38-3.96 2.833 2.833 0 013.974-.38c4.537 3.748 4.861 7.173 4.34 9.385zm20.462-31.876a2.826 2.826 0 01-2.818-2.818 2.826 2.826 0 012.818-2.818h48.971a2.826 2.826 0 012.818 2.818 2.826 2.826 0 01-2.818 2.818H449.87zm75.295 10.738c6.539 2.579 10.499 6.807 11.133 11.894.634 5.073-2.142 10.146-7.849 14.261-5.2 3.763-12.359 6.384-20.152 7.356a52.006 52.006 0 01-6.567.423c-5.397 0-10.499-.874-14.769-2.565-6.539-2.579-10.499-6.807-11.133-11.894-.634-5.073 2.142-10.146 7.849-14.261 5.2-3.763 12.359-6.384 20.152-7.356 7.779-.987 15.361-.211 21.336 2.142zM487.487 475.458c1.635 4.707 3.269 11.02 3.636 18.094 3.255-1.846 6.849-3.086 10.654-3.185 5.369-.141 10.344 2.579 13.937 7.652 3.904 5.496 5.975 13.275 6.102 21.716 11.471 2.508 20.645 1.508 24.577-2.649 2.015-2.142 2.523-5.003 1.536-8.512-2.875-10.132-10.781-12.288-10.865-12.317-1.508-.395-2.41-1.931-2.015-3.439s1.931-2.41 3.439-2.015c.451.113 11.119 3.016 14.853 16.22 1.536 5.411.521 10.358-2.861 13.937-3.622 3.833-9.512 5.792-17.122 5.792-3.551 0-7.483-.423-11.739-1.297-.451 5.327-1.635 10.767-3.579 15.924-1.931 5.158-4.044 9.583-6.356 13.317 19.335 7.807 40.684 6.976 55.354-2.368 11.852-7.553 18.123-19.659 18.123-35.019 0-27.24-6.285-47.491-18.165-58.567-8.357-7.779-19.631-11.232-33.54-10.259-32.553 2.299-43.404 21.225-45.969 26.975z"
        fill="#fff"
      />
      <Path
        d="M511.115 501.291c-1.719-2.438-4.665-5.299-8.977-5.299h-.24c-4.03.099-7.878 2.001-11.246 4.594-7.384 5.637-12.556 14.473-12.627 14.614a2.823 2.823 0 01-3.847 1.029 2.823 2.823 0 01-1.029-3.847c.31-.535 5.059-8.681 12.415-14.91v-.169c.113-7.187-1.409-13.81-3.03-18.785a48.205 48.205 0 00-1.085-3.086 49.91 49.91 0 00-1.254-3.1 46.173 46.173 0 01-6.736 1.776 3.293 3.293 0 01-.521.056 2.83 2.83 0 01-2.762-2.311 2.816 2.816 0 012.255-3.284 38.957 38.957 0 006.482-1.762 31.79 31.79 0 003.072-1.311c8.23-4.002 13.571-10.851 14.853-19.433.831-5.679-.211-11.232-2.762-15.826a21.7 21.7 0 00-2.959-4.171 20.983 20.983 0 00-6.074-4.721c-8.216-4.242-17.066-4.087-24.281.437-5.82 3.664-9.625 9.681-9.484 15.008a8.478 8.478 0 00.803 3.41c3.467 7.596 17.178 9.71 17.333 9.738a2.82 2.82 0 012.382 3.199c-.225 1.536-1.649 2.593-3.199 2.382-.733-.113-14.726-2.255-20.504-10.851-10.527 2.649-57.821 13.796-109.455 13.796-4.199 0-8.427-.07-12.655-.24-12.782 10.273-15.84 41.417-15.882 41.741l-.944 10.09-4.397-9.132c-.056-.113-5.411-11.006-13.571-12.669-3.791-.775-7.779.62-11.866 4.171-9.329 8.103-12.979 29.566-7.976 46.871 1.888 6.482 6.567 17.573 16.883 19.151 22.322 3.396 30.848-10.499 31.2-11.091l1.705-2.861 2.551 2.128c6.186 5.228 50.239 13.331 86.738 10.386 34.188-2.748 50.098-7.469 50.253-7.511l2.339-.719 1.029 2.227c.169.352 4.495 9.075 17.517 12.373 6.764 1.719 14.91 1.888 22.562-7.737a25.593 25.593 0 001.902-2.593c2.325-3.481 4.58-7.948 6.736-13.655 2.283-6.06 3.326-11.95 3.467-17.319.241-8.89-1.986-16.373-5.114-20.784zm-139.711 2.748c-.719 5.693-3.199 9.569-7.356 11.499-2.001.944-4.256 1.325-6.609 1.325-10.724 0-23.633-8.047-25.352-9.16a2.805 2.805 0 01-.846-3.889 2.805 2.805 0 013.889-.846c4.989 3.199 19.49 10.766 26.536 7.469 2.325-1.085 3.678-3.41 4.143-7.103 2.565-20.279-12.401-29.805-12.542-29.89-1.325-.831-1.733-2.565-.916-3.889s2.551-1.733 3.875-.902c.748.451 18.18 11.556 15.178 35.386z"
        fill="#fff"
      />
      <G>
        <Path
          d="M481.428 392.863c.366 2.917 3.128 5.595 7.61 7.356 5.101 2.015 11.697 2.649 18.56 1.79 6.877-.86 13.106-3.1 17.559-6.327 3.889-2.818 5.919-6.088 5.552-8.991v-.014c-.366-2.903-3.128-5.581-7.61-7.342-3.622-1.437-7.99-2.17-12.669-2.17-1.931 0-3.904.127-5.891.38-6.877.86-13.106 3.1-17.559 6.327-3.889 2.818-5.919 6.088-5.552 8.991zM296.213 438.296c6.877-.86 13.106-3.1 17.559-6.327 3.889-2.818 5.919-6.088 5.552-9.005-.31-2.494-2.508-4.862-6.074-6.623-3.565-1.762-8.498-2.889-14.275-2.889-1.86 0-3.805.127-5.82.38-6.877.86-13.106 3.1-17.559 6.327-3.889 2.818-5.919 6.088-5.552 9.005.718 5.778 11.654 10.95 26.169 9.132z"
          fill="#f285a1"
        />
      </G>
    </Svg>
  )
}


export default Sanrio;
