<?php 

/**
 * Class CmdGameBuildRelease
 * 
 * Command to make a release build
 */
class CmdGameBuildRelease implements Asatru\Commands\Command  {
    /**
     * Command handler method
     * 
     * @param $args
     * @return void
     */
    public function handle($args)
    {
        $bundle = $args?->get(0)?->getValue(1) ?? 'html5';

        GameBuild::make($bundle, false);
    }
}