const useJoinClassName = (...classNames: (string | undefined | null)[]) => {
    return classNames.filter(className => !!className).join(' ');
}

export default useJoinClassName;