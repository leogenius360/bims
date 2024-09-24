

export function Divider({textContent}:{textContent:string}, ) {
    return (
        <div className="flex items-center justify-center my-2">
          <div className="border-t border-emerald-400 flex-grow mr-3"></div>
          <span className="text-emerald-400 font-normal">{textContent}</span>
          <div className="border-t border-emerald-400 flex-grow ml-3"></div>
        </div>
    )
}